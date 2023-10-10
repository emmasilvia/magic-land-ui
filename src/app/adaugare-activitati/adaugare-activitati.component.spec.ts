import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugareActivitatiComponent } from './adaugare-activitati.component';

describe('AdaugareActivitatiComponent', () => {
  let component: AdaugareActivitatiComponent;
  let fixture: ComponentFixture<AdaugareActivitatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaugareActivitatiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaugareActivitatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
