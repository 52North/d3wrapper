import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3TimeseriesGraphWrapperComponent } from './d3-timeseries-graph-wrapper.component';

describe('D3TimeseriesGraphWrapperComponent', () => {
  let component: D3TimeseriesGraphWrapperComponent;
  let fixture: ComponentFixture<D3TimeseriesGraphWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [D3TimeseriesGraphWrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3TimeseriesGraphWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
