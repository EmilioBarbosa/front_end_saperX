<template>
  <div>
    <div class="row d-flex justify-center q-mt-lg">
      <q-avatar size="150px" font-size="72px" color="primary" text-color="white" icon="person" />
    </div>
    <!-- componente para mostrar os números do contato -->
    <ShowPhoneNumbers :contact="contact"/>
  </div>
</template>

<script>
import axios from "axios";
import {defineComponent} from 'vue'
import ShowPhoneNumbers from "components/ShowPhoneNumbers.vue";

export default defineComponent({
  name: "ContactPage",
  components: {ShowPhoneNumbers},
  props: {
    id: String
  },
  data(){
    return {
      contact: null
    }
  },
  mounted() {
    axios.get(`http://localhost:8000/api/users/${this.id}`)
      //ao entrar na rota ele busca os dados do contato
      .then((e) => {
        this.contact = e.data
      })
      .catch((e) => {
        alert(e)
      })
  }
})
</script>

