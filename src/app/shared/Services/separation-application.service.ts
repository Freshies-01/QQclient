import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment";
import { DATE_FORMAT } from "app/app.constants";
import { map } from "rxjs/operators";

import { SERVER_API_URL } from "app/app.constants";
import { createRequestOption } from "app/shared/utilities/request-util";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { IAction } from "app/shared/model/action.model";

type EntityResponseType = HttpResponse<ISeparationApplication>;
type EntityArrayResponseType = HttpResponse<ISeparationApplication[]>;

@Injectable({ providedIn: "root" })
export class SeparationApplicationService {
  private resourceUrl = SERVER_API_URL + "api/separation-applications";
  private pendingUrl = SERVER_API_URL + "api/pending-applications";
  private closedUrl = SERVER_API_URL + "api/closed-applications";
  private userUrl = SERVER_API_URL + "api/user-applications";
  private actionUrl = SERVER_API_URL + "api/actions-sa";

  constructor(private http: HttpClient) {}

  create(
    separationApplication: ISeparationApplication
  ): Observable<EntityResponseType> {
    separationApplication.dateSumbitted = moment(Date.now());
    const copy = this.convertDateFromClient(separationApplication);
    return this.http
      .post<ISeparationApplication>(this.resourceUrl, copy, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(
    separationApplication: ISeparationApplication
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(separationApplication);
    return this.http
      .put<ISeparationApplication>(this.resourceUrl, copy, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISeparationApplication>(`${this.resourceUrl}/${id}`, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByLogin(): Observable<EntityArrayResponseType> {
    return this.http
      .get<ISeparationApplication[]>(this.userUrl, {
        observe: "response"
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISeparationApplication[]>(this.resourceUrl, {
        params: options,
        observe: "response"
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  queryPending(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISeparationApplication[]>(this.pendingUrl, {
        params: options,
        observe: "response"
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  queryClosed(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISeparationApplication[]>(this.closedUrl, {
        params: options,
        observe: "response"
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  queryActions(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IAction[]>(`${this.actionUrl}/${id}`, {
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

  private convertDateFromClient(
    separationApplication: ISeparationApplication
  ): ISeparationApplication {
    const copy: ISeparationApplication = Object.assign(
      {},
      separationApplication,
      {
        dateOfLeave:
          separationApplication.dateOfLeave != null &&
          separationApplication.dateOfLeave.isValid()
            ? separationApplication.dateOfLeave.format(DATE_FORMAT)
            : null,
        dateSumbitted:
          separationApplication.dateSumbitted != null &&
          separationApplication.dateSumbitted.isValid()
            ? separationApplication.dateSumbitted.format(DATE_FORMAT)
            : null,
        dateCompleted:
          separationApplication.dateCompleted != null &&
          separationApplication.dateCompleted.isValid()
            ? separationApplication.dateCompleted.format(DATE_FORMAT)
            : null,
        dateApproved:
          separationApplication.dateApproved != null &&
          separationApplication.dateApproved.isValid()
            ? separationApplication.dateApproved.format(DATE_FORMAT)
            : null
      }
    );
    return copy;
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    res.body.dateOfLeave =
      res.body.dateOfLeave != null ? moment(res.body.dateOfLeave) : null;
    res.body.dateSumbitted =
      res.body.dateSumbitted != null ? moment(res.body.dateSumbitted) : null;
    res.body.dateCompleted =
      res.body.dateCompleted != null ? moment(res.body.dateCompleted) : null;
    res.body.dateApproved =
      res.body.dateApproved != null ? moment(res.body.dateApproved) : null;
    return res;
  }

  private convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    res.body.forEach((separationApplication: ISeparationApplication) => {
      separationApplication.dateOfLeave =
        separationApplication.dateOfLeave != null
          ? moment(separationApplication.dateOfLeave)
          : null;
      separationApplication.dateSumbitted =
        separationApplication.dateSumbitted != null
          ? moment(separationApplication.dateSumbitted)
          : null;
      separationApplication.dateCompleted =
        separationApplication.dateCompleted != null
          ? moment(separationApplication.dateCompleted)
          : null;
      separationApplication.dateApproved =
        separationApplication.dateApproved != null
          ? moment(separationApplication.dateApproved)
          : null;
    });
    return res;
  }
}
