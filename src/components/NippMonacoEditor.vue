<template>
  <div ref="rootRef"></div>
</template>

<script lang="ts">
import * as monacoEditor from "monaco-editor";
const { initVimMode } = require("monaco-vim");
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  type PropType,
  ref,
  toRefs,
  watch,
} from "vue";

export default defineComponent({
  props: {
    modelValue: { type: String, required: true },
    options: {
      type: Object as PropType<monacoEditor.editor.IStandaloneEditorConstructionOptions>,
    },
  },
  emits: {
    "update:modelValue"(value: string) {},
  },
  setup(props, context) {
    const rootRef = ref<HTMLDivElement>();
    const { modelValue, options } = toRefs(props);
    let editor: monacoEditor.editor.ICodeEditor | undefined;

    onMounted(() => {
      editor = monacoEditor.editor.create(rootRef.value!, props.options);
      initVimMode(editor);
      editor.setValue(props.modelValue);
      editor.onKeyUp(() => {
        context.emit("update:modelValue", editor!.getValue());
      });
    });

    onBeforeUnmount(() => {
      editor!.dispose();
      editor = undefined;
    });

    watch(modelValue, () => {
      if (editor === undefined) {
        return;
      }
      if (modelValue.value !== editor.getValue()) {
        editor.setValue(modelValue.value);
      }
    });

    watch(options, (newOptions, oldOptions) => {
      if (editor === undefined || newOptions === undefined) {
        return;
      }
      editor.updateOptions(newOptions);
      if (
        newOptions.language === undefined ||
        newOptions.language === oldOptions?.language
      ) {
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
    };
  },
});
</script>
