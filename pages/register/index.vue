<template>
    <div>
      <div>
        <Content>
          <template #modalContent>
            <div class="mt-10 sm:w-[400px]">
              <h1 class="font-normal text-[44px] text-[#212121]">Register</h1>
              <p class="text-[18px] text-[#494949] font-normal mt-2">
                Already have a cargo-connect account?
                <NuxtLink
                  to="/login"
                  class="text-[#0464CB] font-normal text-[18px]"
                  >Log in</NuxtLink
                >
              </p>
              <form class="space-y-4 md:space-y-6 mt-6">
                <div class="overflow-y-scroll h-[260px]">
                  <div>
                    <label
                      for="Company name"
                      class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                      >Company name</label
                    >
                    <input
                      type="text"
                      name="CompanyName"
                      id="CompanyName"
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                      placeholder="Your company name"
                      v-model="formData.companyName"
                    />
                  </div>
                  <div>
                    <label
                      for="ContactName"
                      class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                      >Contact name</label
                    >
                    <input
                      type="text"
                      name="ContactName"
                      id="ContactName"
                      placeholder="Your contact name"
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                      v-model="formData.contactName"
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                      >Email Address</label
                    >
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email Address"
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                      v-model="formData.email"
                    />
                  </div>
                  <div>
                            <div class="relative mt-2">
                                <label for="createPassword" class="block mb-2 text-sm font-normal text-[#4B4B4B]">Create Password</label>

                                <svg @click="togglePassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="cursor-pointer w-6 h-6 absolute xl:right-5 lg:right-3 sm:right-3 right-2 top-10">
                                    <path v-if="!isPassword" stroke-linecap="round" stroke-linejoin="round" d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
                                    <path v-if="!isPassword" stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.297 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-4.839 7-9.542 7S3.732 16.057 2.458 12z" />
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.218a10.451 10.451 0 00-.31.282C2.763 9.463 2 10.656 2 12c1.581 4.77 5.804 7.5 10.5 7.5 1.348 0 2.639-.21 3.843-.603M6.179 6.177a9.718 9.718 0 015.821-1.677c3.966 0 7.455 2.12 9.542 5.5a10.354 10.354 0 01-1.065 1.502m-1.814 2.904C15.869 15.673 14.5 16.5 12 16.5a3.5 3.5 0 01-3.5-3.5c0-.861.327-1.656.865-2.245M15 12c0-1.657-1.343-3-3-3a2.992 2.992 0 00-2.78 1.943M3 3l18 18" />
                                </svg>
                                <input :type="isPassword ? 'text' : 'password'" name="createPassword" id="createPassword" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[13px]" placeholder="Type your email address" v-model="formData.password" />
                            </div>
                        </div>
                  <div>
                    <label
                      for="ContactNo"
                      class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                      >Contact No.</label
                    >
                    <div class="flex items-center text-lg relative">
                      <svg
                        width="24"
                        class="absolute ml-3 mb-3 mr-4"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          fill="#ED2939"
                          d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                        ></path>
                        <path
                          fill="#002495"
                          d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                        ></path>
                        <path fill="#EEE" d="M12 5h12v26H12z"></path>
                      </svg>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="absolute sm:right-5 right-2 top-4 cursor-pointer"
                      >
                        <path
                          d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                          fill="#1E1E1E"
                        />
                      </svg>
                      <span
                        class="absolute left-12 mb-3 mr-4 text-[#1E1E1E] font-normal text-base"
                        >+33</span
                      >
                      <div
                        class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                      ></div>
                      <input
                        type="number"
                        name="ContactNo"
                        id="ContactNo"
                        placeholder="Your Contact No."
                        class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3"

                        v-model="formData.contactNumber"
                      />
                    </div>
                  </div>
                  <div>
                    <Dropdown
                      :items="countriesList"
                      :selectedLabel="selectedLabel"
                      @getValue="getValue"
                    />
                  </div>
                  <div v-if="selectedLabel === 'USA'">
                    <div>
                      <label
                        for="COPIARFCForm"
                        class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                        >W9 Form</label
                      >
                      <label
                        class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150"
                      >
                        <div class="flex justify-between">
                          <p class="text-sm text-[#686868] font-normal">
                            {{ selectedW9File || "Choose file to upload" }}
                          </p>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute right-2"
                          >
                            <path
                              d="M15.6245 4.6136L12.7212 1.7086C12.1806 1.16538 11.5377 0.734706 10.8297 0.441479C10.1216 0.148253 9.36251 -0.00170909 8.59616 0.000263348H4.83366C3.729 0.00158656 2.66996 0.440998 1.88884 1.22211C1.10773 2.00323 0.668315 3.06227 0.666992 4.16693V15.8336C0.668315 16.9383 1.10773 17.9973 1.88884 18.7784C2.66996 19.5595 3.729 19.9989 4.83366 20.0003H13.167C14.2717 19.9989 15.3307 19.5595 16.1118 18.7784C16.8929 17.9973 17.3323 16.9383 17.3337 15.8336V8.73776C17.3357 7.97145 17.1857 7.21234 16.8923 6.50441C16.599 5.79648 16.168 5.1538 15.6245 4.6136ZM14.4462 5.79193C14.7006 6.05372 14.9195 6.34792 15.097 6.66693H11.5003C11.2793 6.66693 11.0674 6.57913 10.9111 6.42285C10.7548 6.26657 10.667 6.05461 10.667 5.8336V2.23693C10.9861 2.41437 11.2806 2.6329 11.5428 2.88693L14.4462 5.79193ZM15.667 15.8336C15.667 16.4966 15.4036 17.1325 14.9348 17.6014C14.4659 18.0702 13.83 18.3336 13.167 18.3336H4.83366C4.17062 18.3336 3.53473 18.0702 3.06589 17.6014C2.59705 17.1325 2.33366 16.4966 2.33366 15.8336V4.16693C2.33366 3.50389 2.59705 2.868 3.06589 2.39916C3.53473 1.93032 4.17062 1.66693 4.83366 1.66693H8.59616C8.73283 1.66693 8.86532 1.6936 9.00033 1.7061V5.8336C9.00033 6.49664 9.26372 7.13252 9.73256 7.60136C10.2014 8.0702 10.8373 8.3336 11.5003 8.3336H15.6278C15.6403 8.4686 15.667 8.60026 15.667 8.73776V15.8336Z"
                              fill="#1B1B1B"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          class="absolute inset-0 opacity-0 cursor-pointer py-1"
                          @change="uploadW9Form"
                        />
                      </label>
                      <p class="text-[#989898] font-normal text-[12px] mt-1">
                        Type should be PDF, DOC, JPG, PNG*
                      </p>
                    </div>
                    <div>
                      <label
                        for="COPIARFCForm"
                        class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-4"
                        >Utility Bill</label
                      >
                      <label
                        class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150"
                      >
                        <div class="flex justify-between">
                          <p class="text-sm text-[#686868] font-normal">
                            {{ selectedUtilityBill || "Choose file to upload" }}
                          </p>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute right-2"
                          >
                            <path
                              d="M15.6245 4.6136L12.7212 1.7086C12.1806 1.16538 11.5377 0.734706 10.8297 0.441479C10.1216 0.148253 9.36251 -0.00170909 8.59616 0.000263348H4.83366C3.729 0.00158656 2.66996 0.440998 1.88884 1.22211C1.10773 2.00323 0.668315 3.06227 0.666992 4.16693V15.8336C0.668315 16.9383 1.10773 17.9973 1.88884 18.7784C2.66996 19.5595 3.729 19.9989 4.83366 20.0003H13.167C14.2717 19.9989 15.3307 19.5595 16.1118 18.7784C16.8929 17.9973 17.3323 16.9383 17.3337 15.8336V8.73776C17.3357 7.97145 17.1857 7.21234 16.8923 6.50441C16.599 5.79648 16.168 5.1538 15.6245 4.6136ZM14.4462 5.79193C14.7006 6.05372 14.9195 6.34792 15.097 6.66693H11.5003C11.2793 6.66693 11.0674 6.57913 10.9111 6.42285C10.7548 6.26657 10.667 6.05461 10.667 5.8336V2.23693C10.9861 2.41437 11.2806 2.6329 11.5428 2.88693L14.4462 5.79193ZM15.667 15.8336C15.667 16.4966 15.4036 17.1325 14.9348 17.6014C14.4659 18.0702 13.83 18.3336 13.167 18.3336H4.83366C4.17062 18.3336 3.53473 18.0702 3.06589 17.6014C2.59705 17.1325 2.33366 16.4966 2.33366 15.8336V4.16693C2.33366 3.50389 2.59705 2.868 3.06589 2.39916C3.53473 1.93032 4.17062 1.66693 4.83366 1.66693H8.59616C8.73283 1.66693 8.86532 1.6936 9.00033 1.7061V5.8336C9.00033 6.49664 9.26372 7.13252 9.73256 7.60136C10.2014 8.0702 10.8373 8.3336 11.5003 8.3336H15.6278C15.6403 8.4686 15.667 8.60026 15.667 8.73776V15.8336Z"
                              fill="#1B1B1B"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          class="absolute inset-0 opacity-0 cursor-pointer py-1"
                          @change="uploadUtilityBill"
                        />
                      </label>
                      <p class="text-[#989898] font-normal text-[12px] mt-1">
                        Type should be PDF, DOC, JPG, PNG*
                      </p>
                    </div>
                    <div>
                      <h1 class="text-[#1E1E1E] font-medium text-base mt-6">
                        Commercial Reference 1
                      </h1>
                      <div>
                        <label
                          for="Company name"
                          class="block mb-2 mt-5 text-sm font-normal text-[#4B4B4B]"
                          >Company name</label
                        >
                        <input
                          type="text"
                          name="CompanyName"
                          id="CompanyName"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                          placeholder="Your company name"
  
                          v-model="commercialReference1.companyName"
                        />
                      </div>
                      <div>
                        <label
                          for="ContactName"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Contact name</label
                        >
                        <input
                          type="text"
                          name="ContactName"
                          id="ContactName"
                          placeholder="Your contact name"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
  
                          v-model="commercialReference1.contactName"
                        />
                      </div>
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Email Address</label
                        >
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Your Email Address"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
  
                          v-model="commercialReference1.emailAddress"
                        />
                      </div>
                      <div>
                        <label
                          for="ContactNo"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Contact No.</label
                        >
                        <div class="flex items-center text-lg relative">
                          <svg
                            width="24"
                            class="absolute ml-3 mb-3 mr-4"
                            viewBox="0 0 36 36"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <path
                              fill="#ED2939"
                              d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                            ></path>
                            <path
                              fill="#002495"
                              d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                            ></path>
                            <path fill="#EEE" d="M12 5h12v26H12z"></path>
                          </svg>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute sm:right-5 right-2 top-4 cursor-pointer"
                          >
                            <path
                              d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                              fill="#1E1E1E"
                            />
                          </svg>
                          <span
                            class="absolute left-12 mb-3 mr-4 text-[#1E1E1E] font-normal text-base"
                            >+33</span
                          >
                          <div
                            class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                          ></div>
                          <input
                            type="number"
                            name="ContactNo"
                            id="ContactNo"
                            placeholder="Your Contact No."
                            class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3"
    
                            v-model="commercialReference1.contactNo"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 class="text-[#1E1E1E] font-medium text-base mt-6">
                        Commercial Reference 2
                      </h1>
                      <div>
                        <label
                          for="Company name"
                          class="block mb-2 mt-5 text-sm font-normal text-[#4B4B4B]"
                          >Company name</label
                        >
                        <input
                          type="text"
                          name="CompanyName"
                          id="CompanyName"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                          placeholder="Your company name"
  
                          v-model="commercialReference2.companyName"
                        />
                      </div>
                      <div>
                        <label
                          for="ContactName"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Contact name</label
                        >
                        <input
                          type="text"
                          name="ContactName"
                          id="ContactName"
                          placeholder="Your contact name"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
  
                          v-model="commercialReference2.contactName"
                        />
                      </div>
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Email Address</label
                        >
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Your Email Address"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
  
                          v-model="commercialReference2.emailAddress"
                        />
                      </div>
                      <div>
                        <label
                          for="ContactNo"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Contact No.</label
                        >
                        <div class="flex items-center text-lg relative">
                          <svg
                            width="24"
                            class="absolute ml-3 mb-3 mr-4"
                            viewBox="0 0 36 36"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <path
                              fill="#ED2939"
                              d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                            ></path>
                            <path
                              fill="#002495"
                              d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                            ></path>
                            <path fill="#EEE" d="M12 5h12v26H12z"></path>
                          </svg>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute sm:right-5 right-2 top-4 cursor-pointer"
                          >
                            <path
                              d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                              fill="#1E1E1E"
                            />
                          </svg>
                          <span
                            class="absolute left-12 mb-3 mr-4 text-[#1E1E1E] font-normal text-base"
                            >+33</span
                          >
                          <div
                            class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                          ></div>
                          <input
                            type="number"
                            name="ContactNo"
                            id="ContactNo"
                            placeholder="Your Contact No."
                            class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3"
    
                            v-model="commercialReference2.contactNo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div v-if="selectedLabel === 'MEXICO'">
                    <div>
                      <label
                        for="COPIARFCForm"
                        class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                        >COPIA RFC Form</label
                      >
                      <label
                        class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150"
                      >
                        <div class="flex justify-between">
                          <p class="text-sm text-[#686868] font-normal">
                            Choose file to upload
                          </p>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute right-2"
                          >
                            <path
                              d="M15.6245 4.6136L12.7212 1.7086C12.1806 1.16538 11.5377 0.734706 10.8297 0.441479C10.1216 0.148253 9.36251 -0.00170909 8.59616 0.000263348H4.83366C3.729 0.00158656 2.66996 0.440998 1.88884 1.22211C1.10773 2.00323 0.668315 3.06227 0.666992 4.16693V15.8336C0.668315 16.9383 1.10773 17.9973 1.88884 18.7784C2.66996 19.5595 3.729 19.9989 4.83366 20.0003H13.167C14.2717 19.9989 15.3307 19.5595 16.1118 18.7784C16.8929 17.9973 17.3323 16.9383 17.3337 15.8336V8.73776C17.3357 7.97145 17.1857 7.21234 16.8923 6.50441C16.599 5.79648 16.168 5.1538 15.6245 4.6136ZM14.4462 5.79193C14.7006 6.05372 14.9195 6.34792 15.097 6.66693H11.5003C11.2793 6.66693 11.0674 6.57913 10.9111 6.42285C10.7548 6.26657 10.667 6.05461 10.667 5.8336V2.23693C10.9861 2.41437 11.2806 2.6329 11.5428 2.88693L14.4462 5.79193ZM15.667 15.8336C15.667 16.4966 15.4036 17.1325 14.9348 17.6014C14.4659 18.0702 13.83 18.3336 13.167 18.3336H4.83366C4.17062 18.3336 3.53473 18.0702 3.06589 17.6014C2.59705 17.1325 2.33366 16.4966 2.33366 15.8336V4.16693C2.33366 3.50389 2.59705 2.868 3.06589 2.39916C3.53473 1.93032 4.17062 1.66693 4.83366 1.66693H8.59616C8.73283 1.66693 8.86532 1.6936 9.00033 1.7061V5.8336C9.00033 6.49664 9.26372 7.13252 9.73256 7.60136C10.2014 8.0702 10.8373 8.3336 11.5003 8.3336H15.6278C15.6403 8.4686 15.667 8.60026 15.667 8.73776V15.8336Z"
                              fill="#1B1B1B"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          class="absolute inset-0 opacity-0 cursor-pointer py-1"
                          @change="handleFileChange"
                        />
                      </label>
                      <p class="text-[#989898] font-normal text-[12px] mt-1">
                        Type should be PDF, DOC, JPG, PNG*
                      </p>
                    </div>
                    <div>
                      <label
                        for="COPIARFCForm"
                        class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                        >Constance of Fiscal Situation</label
                      >
                      <label
                        class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150"
                      >
                        <div class="flex justify-between">
                          <p class="text-sm text-[#686868] font-normal">
                            Choose file to upload
                          </p>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute right-2"
                          >
                            <path
                              d="M15.6245 4.6136L12.7212 1.7086C12.1806 1.16538 11.5377 0.734706 10.8297 0.441479C10.1216 0.148253 9.36251 -0.00170909 8.59616 0.000263348H4.83366C3.729 0.00158656 2.66996 0.440998 1.88884 1.22211C1.10773 2.00323 0.668315 3.06227 0.666992 4.16693V15.8336C0.668315 16.9383 1.10773 17.9973 1.88884 18.7784C2.66996 19.5595 3.729 19.9989 4.83366 20.0003H13.167C14.2717 19.9989 15.3307 19.5595 16.1118 18.7784C16.8929 17.9973 17.3323 16.9383 17.3337 15.8336V8.73776C17.3357 7.97145 17.1857 7.21234 16.8923 6.50441C16.599 5.79648 16.168 5.1538 15.6245 4.6136ZM14.4462 5.79193C14.7006 6.05372 14.9195 6.34792 15.097 6.66693H11.5003C11.2793 6.66693 11.0674 6.57913 10.9111 6.42285C10.7548 6.26657 10.667 6.05461 10.667 5.8336V2.23693C10.9861 2.41437 11.2806 2.6329 11.5428 2.88693L14.4462 5.79193ZM15.667 15.8336C15.667 16.4966 15.4036 17.1325 14.9348 17.6014C14.4659 18.0702 13.83 18.3336 13.167 18.3336H4.83366C4.17062 18.3336 3.53473 18.0702 3.06589 17.6014C2.59705 17.1325 2.33366 16.4966 2.33366 15.8336V4.16693C2.33366 3.50389 2.59705 2.868 3.06589 2.39916C3.53473 1.93032 4.17062 1.66693 4.83366 1.66693H8.59616C8.73283 1.66693 8.86532 1.6936 9.00033 1.7061V5.8336C9.00033 6.49664 9.26372 7.13252 9.73256 7.60136C10.2014 8.0702 10.8373 8.3336 11.5003 8.3336H15.6278C15.6403 8.4686 15.667 8.60026 15.667 8.73776V15.8336Z"
                              fill="#1B1B1B"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          class="absolute inset-0 opacity-0 cursor-pointer py-1"
                          @change="handleFileChange"
                        />
                      </label>
                      <p class="text-[#989898] font-normal text-[12px] mt-1">
                        Type should be PDF, DOC, JPG, PNG*
                      </p>
                    </div>
                    <div>
                      <label
                        for="COPIARFCForm"
                        class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                        >Proof of Favorable</label
                      >
                      <label
                        class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150"
                      >
                        <div class="flex justify-between">
                          <p class="text-sm text-[#686868] font-normal">
                            Choose file to upload
                          </p>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute right-2"
                          >
                            <path
                              d="M15.6245 4.6136L12.7212 1.7086C12.1806 1.16538 11.5377 0.734706 10.8297 0.441479C10.1216 0.148253 9.36251 -0.00170909 8.59616 0.000263348H4.83366C3.729 0.00158656 2.66996 0.440998 1.88884 1.22211C1.10773 2.00323 0.668315 3.06227 0.666992 4.16693V15.8336C0.668315 16.9383 1.10773 17.9973 1.88884 18.7784C2.66996 19.5595 3.729 19.9989 4.83366 20.0003H13.167C14.2717 19.9989 15.3307 19.5595 16.1118 18.7784C16.8929 17.9973 17.3323 16.9383 17.3337 15.8336V8.73776C17.3357 7.97145 17.1857 7.21234 16.8923 6.50441C16.599 5.79648 16.168 5.1538 15.6245 4.6136ZM14.4462 5.79193C14.7006 6.05372 14.9195 6.34792 15.097 6.66693H11.5003C11.2793 6.66693 11.0674 6.57913 10.9111 6.42285C10.7548 6.26657 10.667 6.05461 10.667 5.8336V2.23693C10.9861 2.41437 11.2806 2.6329 11.5428 2.88693L14.4462 5.79193ZM15.667 15.8336C15.667 16.4966 15.4036 17.1325 14.9348 17.6014C14.4659 18.0702 13.83 18.3336 13.167 18.3336H4.83366C4.17062 18.3336 3.53473 18.0702 3.06589 17.6014C2.59705 17.1325 2.33366 16.4966 2.33366 15.8336V4.16693C2.33366 3.50389 2.59705 2.868 3.06589 2.39916C3.53473 1.93032 4.17062 1.66693 4.83366 1.66693H8.59616C8.73283 1.66693 8.86532 1.6936 9.00033 1.7061V5.8336C9.00033 6.49664 9.26372 7.13252 9.73256 7.60136C10.2014 8.0702 10.8373 8.3336 11.5003 8.3336H15.6278C15.6403 8.4686 15.667 8.60026 15.667 8.73776V15.8336Z"
                              fill="#1B1B1B"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          class="absolute inset-0 opacity-0 cursor-pointer py-1"
                          @change="handleFileChange"
                        />
                      </label>
                      <p class="text-[#989898] font-normal text-[12px] mt-1">
                        Type should be PDF, DOC, JPG, PNG*
                      </p>
                    </div>
                    <div>
                      <label
                        for="COPIARFCForm"
                        class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                        >Proof of Address</label
                      >
                      <label
                        class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150"
                      >
                        <div class="flex justify-between">
                          <p class="text-sm text-[#686868] font-normal">
                            Choose file to upload
                          </p>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute right-2"
                          >
                            <path
                              d="M15.6245 4.6136L12.7212 1.7086C12.1806 1.16538 11.5377 0.734706 10.8297 0.441479C10.1216 0.148253 9.36251 -0.00170909 8.59616 0.000263348H4.83366C3.729 0.00158656 2.66996 0.440998 1.88884 1.22211C1.10773 2.00323 0.668315 3.06227 0.666992 4.16693V15.8336C0.668315 16.9383 1.10773 17.9973 1.88884 18.7784C2.66996 19.5595 3.729 19.9989 4.83366 20.0003H13.167C14.2717 19.9989 15.3307 19.5595 16.1118 18.7784C16.8929 17.9973 17.3323 16.9383 17.3337 15.8336V8.73776C17.3357 7.97145 17.1857 7.21234 16.8923 6.50441C16.599 5.79648 16.168 5.1538 15.6245 4.6136ZM14.4462 5.79193C14.7006 6.05372 14.9195 6.34792 15.097 6.66693H11.5003C11.2793 6.66693 11.0674 6.57913 10.9111 6.42285C10.7548 6.26657 10.667 6.05461 10.667 5.8336V2.23693C10.9861 2.41437 11.2806 2.6329 11.5428 2.88693L14.4462 5.79193ZM15.667 15.8336C15.667 16.4966 15.4036 17.1325 14.9348 17.6014C14.4659 18.0702 13.83 18.3336 13.167 18.3336H4.83366C4.17062 18.3336 3.53473 18.0702 3.06589 17.6014C2.59705 17.1325 2.33366 16.4966 2.33366 15.8336V4.16693C2.33366 3.50389 2.59705 2.868 3.06589 2.39916C3.53473 1.93032 4.17062 1.66693 4.83366 1.66693H8.59616C8.73283 1.66693 8.86532 1.6936 9.00033 1.7061V5.8336C9.00033 6.49664 9.26372 7.13252 9.73256 7.60136C10.2014 8.0702 10.8373 8.3336 11.5003 8.3336H15.6278C15.6403 8.4686 15.667 8.60026 15.667 8.73776V15.8336Z"
                              fill="#1B1B1B"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          class="absolute inset-0 opacity-0 cursor-pointer py-1"
                          @change="handleFileChange"
                        />
                      </label>
                      <p class="text-[#989898] font-normal text-[12px] mt-1">
                        Type should be PDF, DOC, JPG, PNG*
                      </p>
                    </div>
                    <div>
                      <h1 class="text-[#1E1E1E] font-medium text-base mt-6">
                        Commercial Reference 1
                      </h1>
                      <div>
                        <label
                          for="Company name"
                          class="block mb-2 mt-5 text-sm font-normal text-[#4B4B4B]"
                          >Company name</label
                        >
                        <input
                          type="text"
                          name="CompanyName"
                          id="CompanyName"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                          placeholder="Your company name"
  
                        />
                      </div>
                      <div>
                        <label
                          for="ContactName"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Contact name</label
                        >
                        <input
                          type="text"
                          name="ContactName"
                          id="ContactName"
                          placeholder="Your contact name"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
  
                        />
                      </div>
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Email Address</label
                        >
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Your Email Address"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
  
                        />
                      </div>
                      <div>
                        <label
                          for="ContactNo"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Contact No.</label
                        >
                        <div class="flex items-center text-lg relative">
                          <svg
                            width="24"
                            class="absolute ml-3 mb-3 mr-4"
                            viewBox="0 0 36 36"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <path
                              fill="#ED2939"
                              d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                            ></path>
                            <path
                              fill="#002495"
                              d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                            ></path>
                            <path fill="#EEE" d="M12 5h12v26H12z"></path>
                          </svg>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute sm:right-5 right-2 top-4 cursor-pointer"
                          >
                            <path
                              d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                              fill="#1E1E1E"
                            />
                          </svg>
                          <span
                            class="absolute left-12 mb-3 mr-4 text-[#1E1E1E] font-normal text-base"
                            >+33</span
                          >
                          <div
                            class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                          ></div>
                          <input
                            type="number"
                            name="ContactNo"
                            id="ContactNo"
                            placeholder="Your Contact No."
                            class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3"
    
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 class="text-[#1E1E1E] font-medium text-base mt-6">
                        Commercial Reference 2
                      </h1>
                      <div>
                        <label
                          for="Company name"
                          class="block mb-2 mt-5 text-sm font-normal text-[#4B4B4B]"
                          >Company name</label
                        >
                        <input
                          type="text"
                          name="CompanyName"
                          id="CompanyName"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                          placeholder="Your company name"
  
                        />
                      </div>
                      <div>
                        <label
                          for="ContactName"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Contact name</label
                        >
                        <input
                          type="text"
                          name="ContactName"
                          id="ContactName"
                          placeholder="Your contact name"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
  
                        />
                      </div>
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Email Address</label
                        >
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Your Email Address"
                          class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
  
                        />
                      </div>
                      <div>
                        <label
                          for="ContactNo"
                          class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2"
                          >Contact No.</label
                        >
                        <div class="flex items-center text-lg relative">
                          <svg
                            width="24"
                            class="absolute ml-3 mb-3 mr-4"
                            viewBox="0 0 36 36"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <path
                              fill="#ED2939"
                              d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                            ></path>
                            <path
                              fill="#002495"
                              d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                            ></path>
                            <path fill="#EEE" d="M12 5h12v26H12z"></path>
                          </svg>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute sm:right-5 right-2 top-4 cursor-pointer"
                          >
                            <path
                              d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                              fill="#1E1E1E"
                            />
                          </svg>
                          <span
                            class="absolute left-12 mb-3 mr-4 text-[#1E1E1E] font-normal text-base"
                            >+33</span
                          >
                          <div
                            class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                          ></div>
                          <input
                            type="number"
                            name="ContactNo"
                            id="ContactNo"
                            placeholder="Your Contact No."
                            class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3"
    
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="w-full text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-5 py-[15px] text-center"
                  @click="sendRegistrationRequest"
                >
                  Send Registration Request
                </button>
                <p class="text-sm font-normal text-[#1E1E1E] max-w-[362px]">
                  By creating an account or signing you have read and agree to our
                  <span class="font-medium text-sm text-[#1E1E1E] cursor-pointer"
                    >Terms and Conditions </span
                  >and
                  <span class="font-medium text-sm text-[#1E1E1E] cursor-pointer"
                    >Privacy Policies</span
                  >
                </p>
              </form>
            </div>
          </template>
        </Content>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        isPassword: false,
        countriesList: [
          {
            label: "USA",
          },
          {
            label: "MEXICO",
          },
        ],
        selectedLabel: "Select option",
        formData: {
          companyName: "",
          contactName: "",
          contactNumber: "",
          email: "",
          password: "",
          companyFormation: {
            usa: {
              w9_Form: "",
              utility_Bill: "",
            },
            mexico: {
              copia_Rfc_Form: "",
              constance_Of_Fiscal_Situation: "",
              proof_of_Favorable: "",
              proof_Of_Address: "",
            },
          },
          commercialReference: [],
        },
        commercialReference1: {
          companyName: "",
          contactName: "",
          emailAddress: "",
          countryCode: 1,
          contactNo: 0,
        },
        commercialReference2: {
          companyName: "",
          contactName: "",
          emailAddress: "",
          countryCode: 1,
          contactNo: 0,
        },
        selectedW9File: "",
        selectedUtilityBill: "",
      };
    },
    methods: {
      ...mapActions({
        signup: "auth/signup",
        uploadImage:"auth/uploadImage"
      }),
      togglePassword() {
            this.isPassword = !this.isPassword;
        },
      getValue(item) {
        this.selectedLabel = item.label;
      },
      async uploadW9Form(event) {
        try {
            const file = event.target.files[0];
            this.formData.companyFormation.usa.w9_Form = file;
            if (file) {
              this.selectedW9File = file.name;
            }
            const formData = new FormData();
            formData.append("file", file);
            const res =  await this.uploadImage(formData);      
            console.log(res,'res');
        } catch (error) {
            console.log(error);
        }
      },
      async uploadUtilityBill(event) {
        try {
            const file = event.target.files[0];
            this.formData.companyFormation.usa.utility_Bill = file;
            if (file) {
              this.selectedUtilityBill = file.name;
            }
            const formData = new FormData();
            formData.append("file", file);
            const res =  await this.uploadImage(formData);
            console.log(res,'res');
        } catch (error) {
            console.log(error);
        }
      },
      handleFileChange(event) {},
      async sendRegistrationRequest() {
        try {
          console.log("formData", this.formData);
          console.log("commercialReference1", [
            this.commercialReference1,
            this.commercialReference2,
          ]);
  
          const formData = new FormData();
          formData.append("companyName", this.formData.companyName);
          formData.append("contactName", this.formData.contactName);
          formData.append("contactNumber", this.formData.contactNumber);
          formData.append("email", this.formData.email);
          formData.append("password", this.formData.password);
          formData.append(
            "companyFormation[usa][w9_Form]",
            this.formData.companyFormation.usa.w9_Form
          );
          formData.append(
            "companyFormation[usa][utility_Bill]",
            this.formData.companyFormation.usa.utility_Bill
          );
          formData.append("commercialReference[0]", this.commercialReference1);
          formData.append("commercialReference[1]", this.commercialReference2);
          console.log("formData", this.formData);
          const response = await this.signup(formData);
          console.log("response", response);
        } catch (error) {
          console.log("error", error);
        }
      },
    },
  };
  </script>
  