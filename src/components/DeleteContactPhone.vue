<template>
  <q-dialog v-model="dialogDeleteUser">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6" v-if="userSelected">Excluir {{ userSelected.name }} dos contatos ?</div>
        <div class="text-h6" v-else>Excluir {{ number.number }} ?</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn flat label="Salvar" v-if="userSelected" v-close-popup @click="deleteUser"/>
        <q-btn flat label="Excluir" v-else v-close-popup @click="deletePhoneNumber"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineComponent} from "vue";
import axios from "axios";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "DeleteUser",
  props:{
    userSelected: Object,
    dialogActive: Boolean,
    number: Object
  },
  setup(){
    const { notifySucess, notifyError } = useNotify()
    return {
      notifySucess,
      notifyError
    }
  },
  data(){
    return {
      dialogDeleteUser: this.dialogActive
    }
  },
  methods:{
    deleteUser() {
      //função para deletar um contato
      //caso sucesso, retorna notificação com sucesso e emite getContacts para atualizar lista
      axios.delete(`http://localhost:8000/api/users/${this.userSelected.id}`)
        .then(response => {
          this.notifySucess(`Contato excluido com sucesso`)
          this.$emit('getContacts')
        }).catch(response => {
          this.notifyError(`Ocorreu um erro ao excluir o contato`)
      })
    },
    deletePhoneNumber(){
      //função para deletar um número
      //caso sucesso, retorna notificação com sucesso e emite getPhones para atualizar lista de telefones
      //manda na requisição o id do número
      axios.delete(`http://localhost:8000/api/users/phone/${this.number.id}`)
        .then(response => {
          this.notifySucess(`Número excluido com sucesso`)
          this.$emit('getPhones')
        }).catch(response => {
        this.notifyError(`Ocorreu um erro ao excluir o número`)
      })
    }
  }
})
</script>

<style scoped>

</style>
