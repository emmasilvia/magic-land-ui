import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditareActivitateComponent } from './editare-activitate.component';

describe('EditareActivitateComponent', () => {
  let component: EditareActivitateComponent;
  let fixture: ComponentFixture<EditareActivitateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditareActivitateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditareActivitateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
