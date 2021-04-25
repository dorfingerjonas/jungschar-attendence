import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTutorComponent } from './new-tutor.component';

describe('NewTutorComponent', () => {
  let component: NewTutorComponent;
  let fixture: ComponentFixture<NewTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
