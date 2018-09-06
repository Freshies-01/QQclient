import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment";
import { DATE_FORMAT } from "app/app.constants";
import { map } from "rxjs/operators";

import { SERVER_API_URL } from "app/app.constants";
import { createRequestOption } from "app/shared/utilities/request-util";
import { IAction } from "app/shared/model/action.model";
import { Duration } from "moment";

type EntityResponseType = HttpResponse<IAction>;
type EntityArrayResponseType = HttpResponse<IAction[]>;

@Injectable({ providedIn: "root" })
export class ActionService {
  private resourceUrl = SERVER_API_URL + "api/actions";
  private testUrl = SERVER_API_URL + "api/actions-sa";
  constructor(private http: HttpClient) {}

  create(action: IAction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(action);
    return this.http
      .post<IAction>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(action: IAction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(action);
    return this.http
      .put<IAction>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAction>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findActionsBySAID(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IAction[]>(`${this.testUrl}/${id}`, {
      observe: "response"
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAction[]>(this.resourceUrl, {
        params: options,
        observe: "response"
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
      observe: "response"
    });
  }

  private convertDateFromClient(action: IAction): IAction {
    const copy: IAction = Object.assign({}, action, {
      dateCompleted:
        action.dateCompleted != null && action.dateCompleted.isValid()
          ? action.dateCompleted.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  actionsBySA(saID: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IAction[]>(`${this.resourceUrl}-sa/${saID}`, { observe: "response" })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }
  actionsByDepartment(deptID: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IAction[]>(`${this.resourceUrl}-dept/${deptID}`, {
        observe: "response"
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  functionWise(deptID: number): Observable<HttpResponse<any>> {
    return this.http.
    get<any>(`${this.resourceUrl}-functionWise/${deptID}`, {observe: "response" });
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    res.body.dateCompleted =
      res.body.dateCompleted != null ? moment(res.body.dateCompleted) : null;
    return res;
  }

  private convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    res.body.forEach((action: IAction) => {
      action.dateCompleted =
        action.dateCompleted != null ? moment(action.dateCompleted) : null;
    });
    return res;
  }
}
