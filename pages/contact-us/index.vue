<template>
  <div>
    <section class="py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
          <div class="flex items-center lg:mb-0 mb-10">
            <div class="">
              <h4
                class="text-indigo-600 text-base font-medium leading-6 mb-4 lg:text-left text-center"
              >
                Contact Us
              </h4>
              <h2
                class="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center"
              >
                Reach Out To Us
              </h2>
              <form action="">
                <input
                  type="text"
                  class="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8"
                  placeholder="Name"
                />
                <input
                  type="email"
                  class="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8"
                  placeholder="Email"
                />
                <textarea
                  name=""
                  id="text"
                  class="w-full h-48 shadow-sm resize-none text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-2xl border border-gray-200 focus:outline-none px-4 py-4 mb-8"
                  placeholder="Description"
                ></textarea>
                <button
                  class="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-full bg-indigo-600 shadow transition-all duration-700 hover:bg-indigo-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div class="lg:block hidden">
            <img
              src="@/static/Images/truck-img.webp"
              alt=""
              class="rounded-xl h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "landing",
};
</script>
