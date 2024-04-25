import { HttpHeaders } from '@angular/common/http';

const getHeaderDict = (): { Authorization: string } => {
  return {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  };
};

export const getRequestOptions = (): { headers: HttpHeaders } => {
  return {
    headers: new HttpHeaders(getHeaderDict())
  };
};
