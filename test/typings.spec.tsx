// @ts-check
import styled from "../";

describe("typings", () => {
  it("does not report ts error", () => {
    const StyledCenter = styled.center``;

    const StyledFont = styled.font``;

    const StyledVmlRoundRect = styled.vml.roundrect``;

    const StyledAnchorLock = styled.wml.anchorlock``;

    const StyledVmlRoundRectAttrs = styled.vml.roundrect.attrs({
      "xmlns:v": "urn:schemas-microsoft-com:vml",
      "xmlns:w": "urn:schemas-microsoft-com:office:word",
    })``;
  });
});
