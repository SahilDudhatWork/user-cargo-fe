<template>
    <div>
      <DashboardHeader />
      <Nuxt />
      <DashboardFooter />
    </div>
</template>

<script>
export default {  
  middleware: "auth",
}
</script>


  
  