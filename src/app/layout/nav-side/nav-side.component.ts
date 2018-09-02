import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-nav-side",
  templateUrl: "./nav-side.component.html",
  styleUrls: ["./nav-side.component.css"]
})
export class NavSideComponent implements OnInit {
  @Input()
  public elementsPushedBySideBar: HTMLElement[];
  public get Shown(): Boolean {
    return this.shown;
  }
  private shown = true;
  public smallScreen: Boolean = false;

  ngOnInit() {
    this.elementsPushedBySideBar.forEach((e: HTMLElement) => {
      e.style.marginLeft = "250px";
    });
  }

  public setShown(showState: boolean) {
    if (showState === true) {
      this.openNav();
      this.shown = true;
    } else {
      this.closeNav();
      this.shown = false;
    }
  }

  private openNav() {
    this.shown = true;
    document.getElementById("mySidenav").classList.remove("closed"); // TODO: Use angular way of setting classes
    if (this.smallScreen === false) {
      this.elementsPushedBySideBar.forEach((e: HTMLElement) => {
        e.style.marginLeft = "250px"; // TODO: Use angular way of setting classes
      });
    }
  }

  private closeNav() {
    this.shown = false;
    document.getElementById("mySidenav").classList.add("closed"); // TODO: use anfular's way for setting classes
    if (this.smallScreen === false) {
      this.elementsPushedBySideBar.forEach((e: HTMLElement) => {
        e.style.marginLeft = "0px"; // TODO: Use angular way of setting classes
      });
    }
  }
}
