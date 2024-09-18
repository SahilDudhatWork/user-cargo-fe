export default async (ctx, inject) => {
  const validatePhoneNumber = async (number) => {
    const phonePattern = /^\d{10}$/;
    if (number && !phonePattern.test(number)) {
      return false;
    }
    return true;
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

    // form.commercialReference.forEach((ref, index) => {
    //   validateField(
    //     ref.companyName,
    //     `commercialReference[${index}].companyName`,
    //     "company-name"
    //   );
    //   validateField(
    //     ref.contactName,
    //     `commercialReference[${index}].contactName`,
    //     "contact-name"
    //   );
    //   validateField(
    //     ref.emailAddress,
    //     `commercialReference[${index}].emailAddress`,
    //     "email"
    //   );
    //   if (
    //     ref.emailAddress &&
    //     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ref.emailAddress)
    //   ) {
    //     setError(
    //       `commercialReference[${index}].emailAddress`,
    //       "Invalid email format"
    //     );
    //   }
    //   validateField(
    //     ref.contactNo,
    //     `commercialReference[${index}].contactNo`,
    //     "contact-number"
    //   );
    // });

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

    // form.commercialReference.forEach((ref, index) => {
    //   validateField(
    //     ref.companyName,
    //     `commercialReference[${index}].companyName`,
    //     "company-name"
    //   );
    //   validateField(
    //     ref.contactName,
    //     `commercialReference[${index}].contactName`,
    //     "contact-name"
    //   );
    //   validateField(
    //     ref.emailAddress,
    //     `commercialReference[${index}].emailAddress`,
    //     "email"
    //   );
    //   if (
    //     ref.emailAddress &&
    //     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ref.emailAddress)
    //   ) {
    //     setError(
    //       `commercialReference[${index}].emailAddress`,
    //       "Invalid email format"
    //     );
    //   }
    //   validateField(
    //     ref.contactNo,
    //     `commercialReference[${index}].contactNo`,
    //     "contact-number"
    //   );
    // });

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
    validateField(
      addressDetails.additionalDetails,
      "additionalDetails",
      "Additional details"
    );

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
    if (!(await validatePhoneNumber(addressDetails.laneNumber))) {
      setError("laneNumber", "Invalid lane number format");
    }
    if (!(await validatePhoneNumber(addressDetails.postalCode))) {
      setError("postalCode", "Invalid postal code format");
    }

    return errors;
  };

  inject("validateFormData", validateFormData);
  inject("validateUserAddress", validateUserAddress);
  inject("validateEditFormData", validateEditFormData);
};
