import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocionListComponent } from './pocion-list.component';

describe('PocionListComponent', () => {
  let component: PocionListComponent;
  let fixture: ComponentFixture<PocionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
