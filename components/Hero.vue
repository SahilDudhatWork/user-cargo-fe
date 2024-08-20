<template>
<div>
    <CargoConnect :imageSrc="truckImage" imagePosition="right">
        <template #modalContent>
            <div>
               <div class="relative">
                <p class="text-[#212121] font-semibold text-[44px] max-w-[594px] mt-24">Go anywhere with all your stuffs with <span class="text-[#0464CB] font-semibold text-[44px] ml-2">Cargo Connect</span>
                <img src="../static/Images/design.webp" alt="" class="absolute right-10">
                </p>
               </div>
                <p class="text-[#494949] font-normal text-[22px] mt-4">We’re delivering goods to the world for a very good cause.</p>
                <p class="text-[#494949] font-normal text-sm max-w-[510px] mt-8">We provide 4 different types of services for all your movement requirement needs, choose the best for your needs and make your experience better with us!</p>
                <div class="flex gap-3 mt-5 mb-8">
                    <button type="submit" class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-full text-[16px] px-[30px] text-center">Lets get started</button>
                    <button type="submit" class="border border-[#212121] font-medium rounded-full text-[16px] px-[30px] py-[13px] text-center">Switch to carrier</button>
                </div>
            </div>
        </template>
    </CargoConnect>
    <CargoConnect :imageSrc="userImage" imagePosition="left" :bgClass="'bg-[#F7F7F7]'">
        <template #modalContent>
            <div>
                <p class="text-[#212121] font-semibold text-[44px] max-w-[594px] mt-24">Transport Your Goods with <span class="text-[#0464CB] font-semibold text-[44px]">Cargo Connect</span></p>
                <p class="text-[#494949] font-normal text-[22px] mt-5 max-w-[594px]">Join our mission to deliver goods worldwide. Choose from four specialized services tailored to meet your transportation needs and ensure a superior experience.</p>
                <button type="submit" class="border border-[#212121] font-medium rounded-full text-[16px] px-[30px] py-[9px] text-center mt-8">Register as user</button>
            </div>
        </template>
    </CargoConnect>
    <CargoConnect :imageSrc="truckImage2" imagePosition="right">
        <template #modalContent>
            <div>
                <p class="text-[#212121] font-semibold text-[44px] max-w-[594px] mt-24">Redefine Your Route with <span class="text-[#0464CB] font-semibold text-[44px]">Cargo Connect</span></p>
                <p class="text-[#494949] font-normal text-[22px] mt-5 max-w-[594px]">Experience logistics like never before. Join our carrier network to deliver goods efficiently and grow your business.</p>
                <button type="submit" class="border border-[#212121] font-medium rounded-full text-[16px] px-[30px] py-[9px] text-center mt-8">Register as user</button>
            </div>
        </template>
    </CargoConnect>
</div>
</template>

<script>
import truckImage from '../static/Images/truck-img-1.webp'
import truckImage2 from '../static/Images/truck-img-2.webp'
import userImage from '../static/Images/user-image.webp'
export default {
    data() {
        return {
            truckImage,
            truckImage2,
            userImage
        }
    },
}
</script>
