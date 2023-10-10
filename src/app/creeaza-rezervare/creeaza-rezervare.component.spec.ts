import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeazaRezervareComponent } from './creeaza-rezervare.component';

describe('CreeazaRezervareComponent', () => {
  let component: CreeazaRezervareComponent;
  let fixture: ComponentFixture<CreeazaRezervareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreeazaRezervareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreeazaRezervareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
