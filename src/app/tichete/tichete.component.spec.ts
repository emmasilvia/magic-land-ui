import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicheteComponent } from './tichete.component';

describe('TicheteComponent', () => {
  let component: TicheteComponent;
  let fixture: ComponentFixture<TicheteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicheteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicheteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
