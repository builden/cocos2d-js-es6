export const res = {
  HelloWorld_png: "res/HelloWorld.png",
  CloseNormal_png: "res/CloseNormal.png",
  CloseSelected_png: "res/CloseSelected.png"
};

export const g_resources = [];
for (const i in res) {
  g_resources.push(res[i]);
}
