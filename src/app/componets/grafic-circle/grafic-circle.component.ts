import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-grafic-circle',
  standalone: true,
  templateUrl: './grafic-circle.component.html',
  styleUrls: ['./grafic-circle.component.scss'],
  imports: []
})
export class GraficCircleComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() chartData: any[] = [];
  
  private root!: am5.Root;
  private series!: am5percent.PieSeries; // Guardar referencia a la serie
  private label!: am5.Label | undefined; // Aceptar undefined al principio, pero asegurarse de que no será undefined después

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si chartData cambia, actualizar el gráfico
    if (changes['chartData'] && this.series) {
      this.updateChart();
    }
  }

  createChart() {
    this.root = am5.Root.new("chartdiv");
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    let chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: am5.percent(50) // Hace el agujero en el centro
      })
    );

    this.series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: "size",
        categoryField: "sector",
        alignLabels: false
      })
    );

    // Inicializa el gráfico con los datos
    this.series.data.setAll(this.chartData);

    // Ocultar etiquetas y líneas de conexión
    this.series.labels.template.set("visible", false);
    this.series.ticks.template.set("visible", false);

    // Agregar tooltip con valor y porcentaje
    this.series.slices.template.set("tooltipText", "{category}: ${value} ({valuePercentTotal.formatNumber('#.0')}%)");

    // Calcular total y mostrarlo en el centro
    this.updateTotalLabel();

    this.series.appear(1000, 100);
  }

  updateChart() {
    // Actualiza los datos de la serie con los nuevos valores
    this.series.data.setAll(this.chartData);

    // Recalcular y actualizar el total
    this.updateTotalLabel();
  }

  updateTotalLabel() {
    // Calcular el total
    let total = this.chartData.reduce((sum, item) => sum + item.size, 0);

    // Si ya existe una etiqueta, eliminarla
    if (this.label) {
      this.label.dispose();
    }

    // Crear y agregar una nueva etiqueta con el total
    this.label = this.series.chart?.seriesContainer.children.push(
      am5.Label.new(this.root, {
        text: `[fontSize:20px]Total[/]\n[fontSize:30px]$${total.toString()}[/]`,
        centerX: am5.percent(50),
        centerY: am5.percent(60),
        textAlign: "center"
      })
    ) as am5.Label; // Aseguramos que la etiqueta es de tipo `Label`
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
