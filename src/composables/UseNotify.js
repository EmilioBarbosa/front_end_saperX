//plugin para notificações do Quasar
import {useQuasar} from "quasar";

export default function useNotify() {
  const $q = useQuasar()

  //para notificações de sucesso
  //tipo positivo, com opção para mensagem customizada
  const notifySucess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || 'Operação concluída com sucesso'
    })
  }
  //para notificações de sucesso
  //tipo negativo, com opção para mensagem customizada
  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || 'Ocorreu um erro'
    })
  }

  return {
    notifySucess,
    notifyError
  }
}
