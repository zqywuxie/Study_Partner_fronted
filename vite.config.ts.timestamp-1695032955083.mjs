// vite.config.ts
import vue from "file:///E:/Code/Study_Partner_fronted-master/Study_Partner_fronted-master/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///E:/Code/Study_Partner_fronted-master/Study_Partner_fronted-master/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VantResolver } from "file:///E:/Code/Study_Partner_fronted-master/Study_Partner_fronted-master/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var vite_config_default = {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ]
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RlXFxcXFN0dWR5X1BhcnRuZXJfZnJvbnRlZC1tYXN0ZXJcXFxcU3R1ZHlfUGFydG5lcl9mcm9udGVkLW1hc3RlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQ29kZVxcXFxTdHVkeV9QYXJ0bmVyX2Zyb250ZWQtbWFzdGVyXFxcXFN0dWR5X1BhcnRuZXJfZnJvbnRlZC1tYXN0ZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0NvZGUvU3R1ZHlfUGFydG5lcl9mcm9udGVkLW1hc3Rlci9TdHVkeV9QYXJ0bmVyX2Zyb250ZWQtbWFzdGVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgeyBWYW50UmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgXSxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZYLE9BQU8sU0FBUztBQUM3WSxPQUFPLGdCQUFnQjtBQUN2QixTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRO0FBQUEsRUFDYixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsSUFDNUIsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
