import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseteazaParolaComponent } from './reseteaza-parola.component';

describe('ReseteazaParolaComponent', () => {
  let component: ReseteazaParolaComponent;
  let fixture: ComponentFixture<ReseteazaParolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseteazaParolaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReseteazaParolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
