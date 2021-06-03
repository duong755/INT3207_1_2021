export function removeAccents(original: string): string {
  return original
    .replaceAll(/(ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ|á|à|ả|ã|ạ)/g, 'a')
    .replaceAll(/(Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Á|À|Ả|Ã|Ạ)/g, 'A')
    .replaceAll(/(đ)/g, 'd')
    .replaceAll(/(Đ)/g, 'D')
    .replaceAll(/(é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ)/g, 'e')
    .replaceAll(/(É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ)/g, 'E')
    .replaceAll(/(í|ì|ỉ|ĩ|ị)/g, 'i')
    .replaceAll(/(Í|Ì|Ỉ|Ĩ|Ị)/g, 'I')
    .replaceAll(/(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ờ|ỡ|ợ|ở|ớ)/g, 'o')
    .replaceAll(/(Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ờ|Ỡ|Ợ|Ở|Ớ)/g, 'O')
    .replaceAll(/(ù|ủ|ú|ũ|ụ|ư|ừ|ử|ứ|ữ|ự)/g, 'u')
    .replaceAll(/(Ù|Ủ|Ú|Ũ|Ụ|Ư|Ừ|Ử|Ứ|Ữ|Ự)/g, 'U');
}
