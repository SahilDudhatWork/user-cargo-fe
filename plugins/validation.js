export default async (ctx, inject) => {
  const validatePhoneNumber = async (number) => {
    const phonePattern = /^\d{10}$/;
    if (number && !phonePattern.test(number)) {
      return false;
    }
    return true;
  };

  const validateNumber = async (value) => {
    let number = value.replace(/\D/g, "");

    if (number.length > 10) {
      number = number.slice(0, 10);
    }
    return number;
  };
  const validateAddressDetail = async (value) => {
    let number = value.replace(/\D/g, "");
    return number;
  };

  const validateFormData = async ({ form }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.companyName, "companyName", "company-name");
    validateField(form.contactName, "contactName", "contact-name");
    validateField(form.contactNumber, "contactNumber", "contact-number");
    validateField(form.password, "password", "password");
    validateField(form.confirmPassword, "confirmPassword", "confirm-password");
    validateField(form.email, "email", "email");

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("email", "Invalid email format");
    }
    if (!(await validatePhoneNumber(form.contactNumber))) {
      setError("contactNumber", "Invalid contact-number format");
    }
    if (form.password !== form.confirmPassword) {
      setError("confirmPassword", "Passwords do not match.");
    }

    if (form.companyFormationType === "USA") {
      if (!form.companyFormation.usa.w9_Form) {
        setError("w9_Form", "W9 Form is required");
      }
      if (!form.companyFormation.usa.utility_Bill) {
        setError("utility_Bill", "Utility Bill is required");
      }
    } else if (form.companyFormationType === "MEXICO") {
      if (!form.companyFormation.maxico.copia_Rfc_Form) {
        setError("copia_Rfc_Form", "Copia Rfc Form is required");
      }
      if (!form.companyFormation.maxico.constance_Of_Fiscal_Situation) {
        setError(
          "constance_Of_Fiscal_Situation",
          "Constance Of Fiscal Situation is required"
        );
      }
      if (!form.companyFormation.maxico.proof_of_Favorable) {
        setError("proof_of_Favorable", "Proof Of Favorable is required");
      }
      if (!form.companyFormation.maxico.proof_Of_Address) {
        setError("proof_Of_Address", "Proof Of Address is required");
      }
    }

    form.commercialReference.forEach(async (ref, index) => {
      if (
        ref.companyName ||
        ref.contactName ||
        ref.emailAddress ||
        ref.contactNo
      ) {
        validateField(
          ref.companyName,
          `commercialReference[${index}].companyName`,
          "company-name"
        );
        validateField(
          ref.contactName,
          `commercialReference[${index}].contactName`,
          "contact-name"
        );
        validateField(
          ref.emailAddress,
          `commercialReference[${index}].emailAddress`,
          "email"
        );
        if (
          ref.emailAddress &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ref.emailAddress)
        ) {
          setError(
            `commercialReference[${index}].emailAddress`,
            "Invalid email format"
          );
        }
        validateField(
          ref.contactNo,
          `commercialReference[${index}].contactNo`,
          "contact-number"
        );
      }
      if (!(await validatePhoneNumber(ref.contactNo))) {
        setError(
          `commercialReference[${index}].contactNo`,
          "Invalid contact-number format"
        );
      }
    });

    return errors;
  };
  const validateEditFormData = async ({ form }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.companyName, "companyName", "company-name");
    validateField(form.contactName, "contactName", "contact-name");
    validateField(form.contactNumber, "contactNumber", "contact-number");
    validateField(form.email, "email", "email");

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("email", "Invalid email format");
    }
    if (!(await validatePhoneNumber(form.contactNumber))) {
      setError("contactNumber", "Invalid contact-number format");
    }
    // if (form.password !== form.confirmPassword) {
    //   setError("confirmPassword", "Passwords do not match.");
    // }

    if (form.companyFormationType === "USA") {
      if (!form.companyFormation.usa.w9_Form) {
        setError("w9_Form", "W9 Form is required");
      }
      if (!form.companyFormation.usa.utility_Bill) {
        setError("utility_Bill", "Utility Bill is required");
      }
    } else if (form.companyFormationType === "MEXICO") {
      if (!form.companyFormation.maxico.copia_Rfc_Form) {
        setError("copia_Rfc_Form", "Copia Rfc Form is required");
      }
      if (!form.companyFormation.maxico.constance_Of_Fiscal_Situation) {
        setError(
          "constance_Of_Fiscal_Situation",
          "Constance Of Fiscal Situation is required"
        );
      }
      if (!form.companyFormation.maxico.proof_of_Favorable) {
        setError("proof_of_Favorable", "Proof Of Favorable is required");
      }
      if (!form.companyFormation.maxico.proof_Of_Address) {
        setError("proof_Of_Address", "Proof Of Address is required");
      }
    }

    form.commercialReference.forEach(async (ref, index) => {
      if (
        ref.companyName ||
        ref.contactName ||
        ref.emailAddress ||
        ref.contactNo
      ) {
        validateField(
          ref.companyName,
          `commercialReference[${index}].companyName`,
          "company-name"
        );
        validateField(
          ref.contactName,
          `commercialReference[${index}].contactName`,
          "contact-name"
        );
        validateField(
          ref.emailAddress,
          `commercialReference[${index}].emailAddress`,
          "email"
        );
        if (
          ref.emailAddress &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ref.emailAddress)
        ) {
          setError(
            `commercialReference[${index}].emailAddress`,
            "Invalid email format"
          );
        }
        validateField(
          ref.contactNo,
          `commercialReference[${index}].contactNo`,
          "contact-number"
        );
      }
      if (!(await validatePhoneNumber(ref.contactNo))) {
        setError(
          `commercialReference[${index}].contactNo`,
          "Invalid contact-number format"
        );
      }
    });

    return errors;
  };

  const validateUserAddress = async ({ form }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    const addressDetails = form.addressDetails;
    validateField(addressDetails.buildinName, "buildinName", "Building-name");
    validateField(addressDetails.postalCode, "postalCode", "Postal-code");
    validateField(addressDetails.laneNumber, "laneNumber", "Lane number");

    const contactDetails = form.contactDetails;
    validateField(contactDetails.contactName, "contactName", "Contact-name");
    validateField(
      contactDetails.contactNumber,
      "contactNumber",
      "Contact number"
    );
    validateField(contactDetails.contactEmail, "contactEmail", "Email");

    if (
      contactDetails.contactEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDetails.contactEmail)
    ) {
      setError("contactEmail", "Invalid email format");
    }

    if (!(await validatePhoneNumber(contactDetails.contactNumber))) {
      setError("contactNumber", "Invalid contact number format");
    }

    return errors;
  };

  const validateUserRef = async ({ form }) => {
    const errors = {};
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    if (!form.userReference) {
      setError("userReference", "user reference is required");
    }
    if (
      form.quantitySelectedLabel == "" ||
      form.quantitySelectedLabel === "Select option"
    ) {
      setError("quantitySelectedLabel", "Please select quantity for chains.");
    }
    if (
      form.quantityStrapsSelectedLabel == "" ||
      form.quantityStrapsSelectedLabel === "Select option"
    ) {
      setError(
        "quantityStrapsSelectedLabel",
        "Please select quantity for straps."
      );
    }
    if (
      form.quantityTarpsSelectedLabel == "" ||
      form.quantityTarpsSelectedLabel === "Select option"
    ) {
      setError(
        "quantityTarpsSelectedLabel",
        "Please select quantity for tarps."
      );
    }

    if (
      form.programeSelectedLabel == "" ||
      form.programeSelectedLabel === "Select option"
    ) {
      setError("programeSelectedLabel", "Please select programming.");
    }

    return errors;
  };

  const validateSubUserForm = async ({ form, isEdit = false }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.contactName, "contactName", "contact-name");
    validateField(form.contactNumber, "contactNumber", "contact-number");
    validateField(form.email, "email", "email");
    if (!isEdit) {
      validateField(form.password, "password", "password");
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("email", "Invalid email format");
    }
    if (!(await validatePhoneNumber(form.contactNumber))) {
      setError("contactNumber", "Invalid contact-number format");
    }

    return errors;
  };

  inject("validateFormData", validateFormData);
  inject("validateUserAddress", validateUserAddress);
  inject("validateNumber", validateNumber);
  inject("validateAddressDetail", validateAddressDetail);
  inject("validateEditFormData", validateEditFormData);
  inject("validateSubUserForm", validateSubUserForm);
  inject("validateUserRef", validateUserRef);
};
