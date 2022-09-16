<template>
  <div v-if="contact" class="d-flex justify-center q-mt-lg">
    <div class="col-6 text-center">
      <p class="text-bold text-h4">{{contact.name}}</p>
    </div>
  </div>
  <div v-if="contact" class="row d-flex justify-center q-mb-lg">
    <div class="col-12 col-md-6 q-p-lg q-mt-lg q-ml-lg">
      <q-list bordered>
        <q-item v-for="(phone, index) in phones" :key="phone.id" class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ index + 1 }}
            </q-avatar>
          </q-item-section>

          <q-item-section  class="d-flex">
            <span>{{ phone.number }}</span>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="edit" color="blue" @click="updatePhoneNumber(phone)"/>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="delete" color="red" @click="deletePhoneNumber(phone)"/>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
  <!--componente para editar o número -->
  <AddUpdatePhone @getPhones="getPhones" :key="keyUpdatePhone" :dialogActive="dialogUpdatePhoneActive" :number="selectedPhoneNumber"/>
  <!--componente para deletar o número -->
  <DeleteContactPhone @getPhones="getPhones" :key="keyDeletePhoneNumber" :dialogActive="dialogDeletePhoneNumber" :number="selectedPhoneNumber"/>
</template>
<script>
import {defineComponent} from "vue";
import AddUpdatePhone from "components/AddUpdatePhone.vue";
import DeleteContactPhone from "components/DeleteContactPhone.vue";
import axios from "axios";

export default defineComponent({
  name: 'ShowPhoneNumbers',
  components: {
    AddUpdatePhone,
    DeleteContactPhone
  },
  props: {
    contact: Object
  },
  data(){
    return{
      selectedPhoneNumber: null,
      keyUpdatePhone: 0,
      keyDeletePhoneNumber:0,
      dialogUpdatePhoneActive: false,
      dialogDeletePhoneNumber: false,
      phones: null
    }
  },
  methods:{
    updatePhoneNumber(phone){
      //função para ativar o componente AddUpdatePhone
      //no clique armazena o número em uma variavel, dialogUpdatePhoneActive recebe true
      //e a key do componente é atualizada para ele renderizar novamente com os novos valores
      this.selectedPhoneNumber = phone
      this.dialogUpdatePhoneActive = true
      this.keyUpdatePhone += 1
    },
    deletePhoneNumber(phone){
      //função para ativar o componente DeleteContactPhone
      //no clique armazena o número em uma variavel, dialogDeletePhoneNumber recebe true
      //e a key do componente é atualizada para ele renderizar novamente com os novos valores
      this.selectedPhoneNumber = phone
      this.dialogDeletePhoneNumber = true
      this.keyDeletePhoneNumber += 1
    },
    getPhones(){
      //função para buscar a lista de telefones de um usuário
      //caso sucesso a variável phones recebe a nova lista
      axios.get(`http://localhost:8000/api/users/${this.contact.id}/phones`)
        .then(response => {
          this.phones = response.data
        })
        .catch(response => {
          alert(response)
        })
    }
  },
  updated() {
    //para armazenar os telefones do usuário em uma variável
    //para que se a lista for atualizada, atualize somente a variável, não a props contact
    this.phones = this.contact.phones
  }
})
</script>
