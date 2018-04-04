import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as brain from 'brain.js';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements AfterViewInit {
  @ViewChild('input') input: any;
  @ViewChild('example') example: any;
  network = new brain.NeuralNetwork();
  color: any = '#ff0000';

  ngAfterViewInit() {
    this.trainModel();
  }

  colorChange(event) {
    console.log(this.input.nativeElement.value);
    const rgb = this.getRgb(this.color);
    console.log(rgb);
    const result = brain.likely(rgb, this.network);
    console.log(result);
    this.example.nativeElement.style.color =
        result === 'dark' ? 'white' : 'black';
  }

  trainModel() {
    this.network.train([
      {input: {r: 0.62, g: 0.72, b: 0.88}, output: {light: 1}},
      {input: {r: 0.1, g: 0.84, b: 0.72}, output: {light: 1}},
      {input: {r: 0.33, g: 0.24, b: 0.29}, output: {dark: 1}},
      {input: {r: 0.74, g: 0.78, b: 0.86}, output: {light: 1}},
      {input: {r: 0.31, g: 0.35, b: 0.41}, output: {dark: 1}},
      {input: {r: 1, g: 0.99, b: 0}, output: {light: 1}},
      {input: {r: 1, g: 0.42, b: 0.52}, output: {dark: 1}},
      {input: {r: 0, g: 0.28, b: .71}, output: {dark: 1}},
    ]);
  }

  getRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
      g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
      b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
    } : null;
  }
}
