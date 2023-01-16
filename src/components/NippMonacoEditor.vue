<template>
  <div ref="rootRef"></div>
</template>

<script lang="ts">
import * as monacoEditor from 'monaco-editor';
import {defineComponent, onBeforeUnmount, onMounted, type PropType, ref, toRefs, watch} from 'vue';

export default defineComponent({
  props: {
    value: { type: String, required: true },
    options: { type: Object as PropType<monacoEditor.editor.IStandaloneEditorConstructionOptions> },
  },
  emits: {
    input(value: string) {}
  },
  setup(props, context) {
    const rootRef = ref<HTMLDivElement>();
    const { value, options } = toRefs(props);
    let editor: monacoEditor.editor.ICodeEditor | undefined;

    onMounted(() => {
      editor = monacoEditor.editor.create(rootRef.value!, props.options);
      editor.setValue(props.value);
      editor.onKeyUp(() => {
        context.emit('input', editor!.getValue());
      });
    });

    onBeforeUnmount(() => {
      editor!.dispose();
      editor = undefined;
    });

    watch(value, () => {
      if (editor === undefined) {
        return;
      }
      if (value.value !== editor.getValue()) {
        editor.setValue(value.value);
      }
    });

    watch(options, (newOptions, oldOptions) => {
      if (editor === undefined || newOptions === undefined) {
        return;
      }
      editor.updateOptions(newOptions);
      if (newOptions.language === undefined || newOptions.language === oldOptions?.language) {
       return;
      }
      const editorModel = editor.getModel();
      if (editorModel === null) {
        return;
      }
      monacoEditor.editor.setModelLanguage(editorModel, newOptions.language);
    });

    return {
      rootRef,
    }
  }
});
</script>
