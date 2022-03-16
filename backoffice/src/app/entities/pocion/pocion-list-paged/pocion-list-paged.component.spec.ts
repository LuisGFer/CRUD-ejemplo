import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocionListPagedComponent } from './pocion-list-paged.component';

describe('PocionListPagedComponent', () => {
  let component: PocionListPagedComponent;
  let fixture: ComponentFixture<PocionListPagedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocionListPagedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocionListPagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
