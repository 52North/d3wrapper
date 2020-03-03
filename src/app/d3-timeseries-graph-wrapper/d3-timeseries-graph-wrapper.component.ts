import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output
} from '@angular/core';

import { DatasetOptions, Timespan } from '@helgoland/core';
import { D3PlotOptions } from '@helgoland/d3';

@Component({
  selector: 'app-d3-timeseries-graph-wrapper',
  templateUrl: './d3-timeseries-graph-wrapper.component.html',
  styleUrls: ['./d3-timeseries-graph-wrapper.component.scss']
})
export class D3TimeseriesGraphWrapperComponent implements OnInit, OnChanges {

  @Input() urls: string;
  @Input() timespaninput: string;
  @Input() colorsinput: string;

  @Output() display = new EventEmitter();

  public datasetIds: string[];
  public timespan: Timespan;
  public colors: string[];

  public datasetOptions: Map<string, DatasetOptions> = new Map();
  public colorsDefault = ['#123456', '#FF0000'];

  public diagramOptionsD3: D3PlotOptions = {
    togglePanZoom: false,
    showReferenceValues: false,
    hoverable: true,
    grid: true,
    // overview: false,
    generalizeAllways: true
  };
  public panZoom = 'pan';

  public selectedIds: string[] = [];



  constructor() { }

  ngOnInit() {
    console.log('ngOnInit()');

    if (this.timespaninput) {
      this.updateTimespan();
    } else {
      this.timespan = new Timespan(new Date().getTime() - 100000000, new Date().getTime());
    }

    if (this.colorsinput) {
      this.colors = JSON.parse(this.colorsinput.replace(/'/g, '"'));
    } else {
      this.colors = this.colorsDefault;
    }

    if (this.urls) {
      this.updateUrls(true);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.log(changes);
      if (changes.urls && changes.urls.previousValue !== undefined) {
        this.updateUrls(false);
      }
      if (changes.timespaninput && changes.timespaninput.previousValue !== undefined) {
        this.updateTimespan();
      }
    }
  }

  public timespanChanged(timespan: Timespan) {
    this.timespan = timespan;
  }

  public togglePanZoom() {
    this.diagramOptionsD3.togglePanZoom = !this.diagramOptionsD3.togglePanZoom;
    this.panZoom = this.diagramOptionsD3.togglePanZoom === true ? 'pan' : 'zoom';
  }

  public highlight(ids: string[]) {
    this.selectedIds = ids;
  }

  public triggerEvent() {
    this.display.emit(`
    Timespan From: ${new Date(this.timespan.from)}

    Timespan To: ${new Date(this.timespan.to)}

    IDs: ${this.datasetIds}
    `);
  }

  private updateUrls(colorchange: boolean) {
    this.datasetIds = JSON.parse(this.urls.replace(/'/g, '"'));
    if (colorchange) {
      this.datasetIds.forEach((entry, i) => {
        this.datasetOptions.set(entry, new DatasetOptions(entry, this.colors[i]));
      });
    }
  }

  private updateTimespan() {
    const timespans: [string, string] = JSON.parse(this.timespaninput);
    if (isNaN(Number(timespans[0])) || isNaN(Number(timespans[1]))) {
      this.timespan = new Timespan(parseInt(timespans[0], 10), parseInt(timespans[1], 10));
    } else {
      this.timespan = new Timespan(Number(timespans[0]), Number(timespans[1]));
    }

  }

}
