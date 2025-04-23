/* eslint-disable @typescript-eslint/no-explicit-any */
export const joditConfig = {
  uploader: {
    url: `https://api.cloudinary.com/v1_1/do2cbxkkj/image/upload`,
    format: 'json',
    prepareData: (formData: FormData) => {
      const file = formData.get('files[0]');
      if (!file) {
        throw new Error('No file selected');
      }

      formData.delete('files[0]');
      formData.append('file', file);
      formData.append('upload_preset', 'zrf-foundation');

      return formData;
    },
    isSuccess: (resp: any) => !resp.error,
    process: (resp: any) => {
      // Cloudinary returns the URL in the secure_url field
      return {
        files: resp.secure_url ? [resp.secure_url] : [],
        path: resp.secure_url,
        error: resp.error,
        msg: resp.message,
      };
    },
    defaultHandlerSuccess: (response: any, component: any) => {
      // Insert the image immediately after upload
      if (response.files && response.files.length) {
        const imageUrl = response.files[0];
        component.selection.insertImage(imageUrl, null, 250);
      }
    },
    error: (e: Error) => {
      console.error('Upload error:', e.message);
    }
  },
  height: 500,
  toolbarAdaptive: false,
  spellcheck: false,
  disablePlugins: ['speechRecognition'],
  // Enable image resizing and alignment
  enableDragAndDropFileToEditor: true,
  imageDefaultWidth: 250,
  // imageProcessor: {
  //   replaceRelativeUrls: true
  // }
};

