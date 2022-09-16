<template>
  <q-dialog v-model="dialogAddPhone">
    <q-card style="min-width: 300px">
      <q-card-section v-if="userSelected">
        <div class="text-h6">Adicione um número para {{userSelected.name}} </div>
      </q-card-section>
      <q-card-section v-else>
        <div class="text-h6">Editar número</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="phone_number" mask="(##)#####-####" unmasked-value autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn v-if="userSelected" flat label="Adicionar telefone" v-close-popup @click="saveNewNumber"/>
        <q-btn v-else flat label="Editar telefone" v-close-popup @click="updateNumber"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import axios from "axios";
import {defineComponent} from 'vue'
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "AddPhone",
  setup(){
    const { notifySucess, notifyError } = useNotify()
    return {
      notifySucess,
      notifyError
    }
  },
  props: {
    userSelected: Object,
    dialogActive: Boolean,
    number: Object
  },
  data(){
    return {
      dialogAddPhone: this.dialogActive,
      phone_number:'',
    }
  },
  methods: {
    saveNewNumber(){
      //caso o uso seja para salvar um novo número
      //faz a requisição para a rota post e caso sucesso mostra notificação de sucesso
      axios.post('http://localhost:8000/api/users/phone',{
        'contact': this.userSelected.id,
        'number': this.phone_number
      }).then(response => {
        this.notifySucess(`Novo número adicionado para ${this.userSelected.name} com sucesso`)
      }).catch(response => {
        this.notifyError(`Ocorreu um erro ao adicionar o número para ${this.userSelected.name}`)
      })
    },
    updateNumber(){
      //caso o uso seja para editar um número
      //faz a requisição para a rota put e caso sucesso mostra notificação de sucesso
      axios.put(`http://localhost:8000/api/users/phone/${this.number.id}`,{
        'number': this.phone_number
      }).then(response => {
        this.notifySucess(`Número editado com sucesso`)
        this.$emit('getPhones')
      }).catch(response => {
        this.notifyError(`Ocorreu um erro ao editar o número`)
      })
    }
  },
  mounted() {
    //caso o uso seja para editar o número, ele carrega no input o valor, para facilitar para o usuário
    if (this.number){
      this.phone_number = this.number.number
    }
  }
})
</script>

<style scoped>

</style>
