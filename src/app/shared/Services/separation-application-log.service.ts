import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment";
import { DATE_FORMAT } from "app/app.constants";
import { map } from "rxjs/operators";

import { SERVER_API_URL } from "app/app.constants";
import { createRequestOption } from "app/shared/utilities/request-util";
import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";

type EntityResponseType = HttpResponse<ISeparationApplicationLog>;
type EntityArrayResponseType = HttpResponse<ISeparationApplicationLog[]>;

@Injectable({ providedIn: "root" })
export class SeparationApplicationLogService {
  private resourceUrl = SERVER_API_URL + "api/separation-application-logs";
  private logsUrl = SERVER_API_URL + "api/logs";

  constructor(private http: HttpClient) {}

  create(
    separationApplicationLog: ISeparationApplicationLog
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(separationApplicationLog);
    return this.http
      .post<ISeparationApplicationLog>(this.resourceUrl, copy, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(
    separationApplicationLog: ISeparationApplicationLog
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(separationApplicationLog);
    return this.http
      .put<ISeparationApplicationLog>(this.resourceUrl, copy, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISeparationApplicationLog>(`${this.resourceUrl}/${id}`, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findBySaId(saId: number): Observable<EntityArrayResponseType> {
    return this.http.get<ISeparationApplicationLog[]>(
      `${this.logsUrl}/${saId}`,
      {
        observe: "response"
      }
    );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISeparationApplicationLog[]>(this.resourceUrl, {
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

  private convertDateFromClient(
    separationApplicationLog: ISeparationApplicationLog
  ): ISeparationApplicationLog {
    const copy: ISeparationApplicationLog = Object.assign(
      {},
      separationApplicationLog,
      {
        dateEdited:
          separationApplicationLog.dateEdited != null &&
          separationApplicationLog.dateEdited.isValid()
            ? separationApplicationLog.dateEdited.format(DATE_FORMAT)
            : null
      }
    );
    return copy;
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    res.body.dateEdited =
      res.body.dateEdited != null ? moment(res.body.dateEdited) : null;
    return res;
  }

  private convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    res.body.forEach((separationApplicationLog: ISeparationApplicationLog) => {
      separationApplicationLog.dateEdited =
        separationApplicationLog.dateEdited != null
          ? moment(separationApplicationLog.dateEdited)
          : null;
    });
    return res;
  }
}
