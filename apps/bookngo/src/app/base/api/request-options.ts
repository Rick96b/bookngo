import { HttpHeaders } from "@angular/common/http";

const headerDict = {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
}

export const requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(headerDict), 
};
