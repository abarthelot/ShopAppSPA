import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerchaseHistoryComponent } from './perchase-history.component';

describe('PerchaseHistoryComponent', () => {
  let component: PerchaseHistoryComponent;
  let fixture: ComponentFixture<PerchaseHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerchaseHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
