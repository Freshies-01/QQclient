import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { SERVER_API_URL } from "app/app.constants";
import { createRequestOption } from "app/shared/utilities/request-util";
import { IFunctionReps } from "app/shared/model/function-reps.model";

type EntityResponseType = HttpResponse<IFunctionReps>;
type EntityArrayResponseType = HttpResponse<IFunctionReps[]>;

@Injectable({ providedIn: "root" })
export class FunctionRepsService {
  private resourceUrl = SERVER_API_URL + "api/function-reps";
  private currentFunctionRepUrl = SERVER_API_URL + "api/current-function-reps";

  constructor(private http: HttpClient) {}

  create(functionReps: IFunctionReps): Observable<EntityResponseType> {
    return this.http.post<IFunctionReps>(this.resourceUrl, functionReps, {
      observe: "response"
    });
  }

  update(functionReps: IFunctionReps): Observable<EntityResponseType> {
    return this.http.put<IFunctionReps>(this.resourceUrl, functionReps, {
      observe: "response"
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFunctionReps>(`${this.resourceUrl}/${id}`, {
      observe: "response"
    });
  }

  findCurrentFunctionRep(): Observable<EntityResponseType> {
    return this.http.get<IFunctionReps>(this.currentFunctionRepUrl, {
      observe: "response"
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFunctionReps[]>(this.resourceUrl, {
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
