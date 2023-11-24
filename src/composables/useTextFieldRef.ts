import { ref } from 'vue'
import type CommandTextField from '../components/CommandTextField.vue'

export function useTextFieldRef () {
  const textFieldRef = ref<Array<InstanceType<typeof CommandTextField>>>([])
  function setTextFieldRef (el: any, index: number) {
    textFieldRef.value[index] = el
  }

  function activateLastTextField () {
    textFieldRef.value.filter(Boolean).at(-1)?.activate()
  }

  return {
    setTextFieldRef,
    activateLastTextField,
  }
}
