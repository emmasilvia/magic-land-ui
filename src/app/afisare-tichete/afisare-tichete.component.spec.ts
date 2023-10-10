import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfisareTicheteComponent } from './afisare-tichete.component';

describe('AfisareTicheteComponent', () => {
  let component: AfisareTicheteComponent;
  let fixture: ComponentFixture<AfisareTicheteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfisareTicheteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfisareTicheteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
