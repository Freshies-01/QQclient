import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { SERVER_API_URL } from "app/app.constants";
import { createRequestOption } from "app/shared/utilities/request-util";
import { IHrReps } from "app/shared/model/hr-reps.model";

type EntityResponseType = HttpResponse<IHrReps>;
type EntityArrayResponseType = HttpResponse<IHrReps[]>;

@Injectable({ providedIn: "root" })
export class HrRepsService {
  private resourceUrl = SERVER_API_URL + "api/hr-reps";

  constructor(private http: HttpClient) {}

  create(hrReps: IHrReps): Observable<EntityResponseType> {
    return this.http.post<IHrReps>(this.resourceUrl, hrReps, {
      observe: "response"
    });
  }

  update(hrReps: IHrReps): Observable<EntityResponseType> {
    return this.http.put<IHrReps>(this.resourceUrl, hrReps, {
      observe: "response"
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHrReps>(`${this.resourceUrl}/${id}`, {
      observe: "response"
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHrReps[]>(this.resourceUrl, {
      params: options,
      observe: "response"
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
      observe: "response"
    });
  }
}
