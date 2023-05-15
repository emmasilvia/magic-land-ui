import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitatiParcComponent } from './activitati-parc.component';

describe('ActivitatiParcComponent', () => {
  let component: ActivitatiParcComponent;
  let fixture: ComponentFixture<ActivitatiParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitatiParcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitatiParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
