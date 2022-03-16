import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocionFormComponent } from './pocion-form.component';

describe('PocionFormComponent', () => {
  let component: PocionFormComponent;
  let fixture: ComponentFixture<PocionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
