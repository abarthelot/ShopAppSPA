import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageEditorComponentComponent } from './item-image-editor-component.component';

describe('ItemImageEditorComponentComponent', () => {
  let component: ItemImageEditorComponentComponent;
  let fixture: ComponentFixture<ItemImageEditorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemImageEditorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemImageEditorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
