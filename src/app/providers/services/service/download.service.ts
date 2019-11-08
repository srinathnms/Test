// import { Injectable } from "@angular/core";
// import { saveAs } from 'file-saver';

// @Injectable()
// export class DownloadService {

//     public downloadFile(file: string, filename: string): void {
//         let blob = this.b64toBlob(file);
//         filename = filename + ".JPG";
//         saveAs(blob, filename);
//     }

//     private b64toBlob(b64Data: string) {
//         let contentType = "application/octet-stream";
//         let sliceSize = 512;
//         let byteCharacters = atob(b64Data);
//         let byteArrays = [];

//         for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//             let slice = byteCharacters.slice(offset, offset + sliceSize);

//             let byteNumbers = new Array(slice.length);
//             for (let i = 0; i < slice.length; i++) {
//                 byteNumbers[i] = slice.charCodeAt(i);
//             }

//             let byteArray = new Uint8Array(byteNumbers);
//             byteArrays.push(byteArray);
//         }
//         let blob = new Blob(byteArrays, { type: contentType });
//         return blob;
//     }
// }