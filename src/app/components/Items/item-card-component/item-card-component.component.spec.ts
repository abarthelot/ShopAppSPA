import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardComponentComponent } from './item-card-component.component';

describe('ItemCardComponentComponent', () => {
  let component: ItemCardComponentComponent;
  let fixture: ComponentFixture<ItemCardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
