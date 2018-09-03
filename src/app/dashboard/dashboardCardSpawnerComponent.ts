import {
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  ViewChild,
  ViewContainerRef,
  OnInit
} from "@angular/core";
import { DashboardCard } from "./dashboardCards/dashboardCard";

@Component({
  selector: "app-dashboard-card-spawner",
  template: `
    <div #spawn></div>`,
  styles: [":host { height: 100%; width: 100%;}"]
})
export class DashboardCardSpawnerComponent implements OnInit {
  @ViewChild("spawn", { read: ViewContainerRef })
  container;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  @Input()
  set card(data: DashboardCard) {
    if (!data) {
      return;
    }
    const inputProviders = Object.keys(data.inputs).map(inputName => {
      return {
        provide: data.inputs[inputName].key,
        useValue: data.inputs[inputName].value,
        deps: []
      };
    });
    const injector = Injector.create(
      inputProviders,
      this.container.parentInjector
    );
    const factory = this.resolver.resolveComponentFactory(data.component);
    const component = factory.create(injector);
    this.container.insert(component.hostView);
  }
}
