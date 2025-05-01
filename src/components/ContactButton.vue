<template>
    <v-btn rounded color="grey-lighten-2" variant="flat" class="pa-6 text-overline d-flex align-center justify-center"
        @click="redirectToWhatsApp">
        <v-icon class="pr-4">mdi-whatsapp</v-icon>
        <span class="font-weight-regular">
            Entre em contato
        </span>
    </v-btn>
</template>
<script setup lang="ts">

function redirectToWhatsApp() {
    const phoneNumber = '5511977652048'; // Substitua pelo número de telefone desejado
    const message = 'Olá, gostaria de mais informações!'; // Mensagem padrão
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
</script>
<style scoped lang="scss"></style>