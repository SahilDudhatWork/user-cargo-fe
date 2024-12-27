<template>
  <div>
    <div>
      <Additional :isShowButton="false">
        <template #content>
          <h1 class="font-bold text-[18px] text-[#000000]">Payment</h1>
          <p class="text-base font-medium text-gray-400">Payment with paypal</p>
          <div class="flex items-center">
            <p class="text-sm text-[#151515] font-normal mt-3 mb-3">Paypal</p>
            <div
              class="h-full mx-2 lg:w-[86%] w-full relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
            ></div>
          </div>
          <div class="flex justify-center">
            <div class="sm:w-6/12">
              <div id="paypal-button"></div>
            </div>
          </div>
        </template>
      </Additional>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    totalPrice: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      capturePayment: "service/capturePayment",
    }),
    renderPayPalButton() {
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: this.totalPrice,
                    },
                  },
                ],
              });
            },

            onApprove: async (data, actions) => {
              try {
                let response = await this.capturePayment({
                  orderId: data.orderID,
                });
                this.$emit("approvePayment", response.data);
              } catch (error) {
                if (error?.response?.data?.statusCode === 401) {
                  this.$cookies.remove("refreshToken");
                  this.$cookies.remove("token");
                  this.$router.push("/login");
                }
                console.error("Api Error:", error);
              }
            },
            onError: (err) => {
              console.error("PayPal Button Error:", err);
            },
          })
          .render("#paypal-button");
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.renderPayPalButton();
    }, 1000);
  },
};
</script>
