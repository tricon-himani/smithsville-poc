import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { PromptBoxComponent } from './prompt-box.component';

describe('PromptBoxComponent', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PromptBoxComponent
    ]
  }));

});
