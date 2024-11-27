import {useMutation} from 'react-query';

export function useUploadFile() {
    return useMutation(async (file) => {
      // 파일 업로드 로직
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('파일 업로드 실패');
      }
  
      const result = await response.json();
      return result;
    });
  }



