import utils from './utils';

function adjustForViewport(elFuturePos, elRegion, xRect, yRect, overflow) {
  const pos = utils.clone(elFuturePos);
  const size = {
    width: elRegion.width,
    height: elRegion.height,
  };

  if (overflow.adjustX && pos.left < xRect.left) {
    pos.left = xRect.left;
  }

  // Left edge inside and right edge outside viewport, try to resize it.
  if (overflow.resizeWidth &&
    pos.left >= xRect.left &&
    pos.left + size.width > xRect.right) {
    size.width -= (pos.left + size.width) - xRect.right;
  }

  // Right edge outside viewport, try to move it.
  if (overflow.adjustX && pos.left + size.width > xRect.right) {
    // 保证左边界和可视区域左边界对齐
    pos.left = Math.max(xRect.right - size.width, xRect.left);
  }

  // Top edge outside viewport, try to move it.
  if (overflow.adjustY && pos.top < yRect.top) {
    pos.top = yRect.top;
  }

  // Top edge inside and bottom edge outside viewport, try to resize it.
  if (overflow.resizeHeight &&
    pos.top >= yRect.top &&
    pos.top + size.height > yRect.bottom) {
    size.height -= (pos.top + size.height) - yRect.bottom;
  }

  // Bottom edge outside viewport, try to move it.
  if (overflow.adjustY && pos.top + size.height > yRect.bottom) {
    // 保证上边界和可视区域上边界对齐
    pos.top = Math.max(yRect.bottom - size.height, yRect.top);
  }

  return utils.mix(pos, size);
}

export default adjustForViewport;
