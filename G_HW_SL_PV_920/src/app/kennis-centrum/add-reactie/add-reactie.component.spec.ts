import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReactieComponent } from './add-reactie.component';

describe('AddReactieComponent', () => {
  let component: AddReactieComponent;
  let fixture: ComponentFixture<AddReactieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReactieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReactieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
