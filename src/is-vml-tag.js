export default function isVmlTag(tag) {
  return typeof tag === "string" && /^(v|w|o):/i.test(tag);
}
